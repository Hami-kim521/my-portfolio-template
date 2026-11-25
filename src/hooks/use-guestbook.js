import { useCallback, useEffect, useState } from 'react';

import { supabase } from '../lib/supabase';

const PAGE_SIZE = 6;
const PHOTO_BUCKET = 'guestbook-photos';
const SELECT_COLUMNS = 'id, masked_name, organization, emoji, message, photo_url, created_at';

/**
 * 사진 파일을 Supabase Storage 에 업로드하고 공개 URL 을 반환한다.
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<string>} 공개 URL
 */
async function uploadPhoto(file) {
  const ext = file.name.split('.').pop().toLowerCase();
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(PHOTO_BUCKET).upload(path, file, {
    contentType: file.type,
  });
  if (error) throw error;
  return supabase.storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl;
}

/**
 * 방명록 목록 조회 / 작성을 담당하는 커스텀 훅
 *
 * @returns {{ entries: Array, isLoading: boolean, hasMore: boolean, errorMessage: string,
 *   loadMore: function, addEntry: function }}
 */
export default function useGuestbook() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchPage = useCallback(async (from) => {
    const { data, error } = await supabase
      .from('guestbook_entries')
      .select(SELECT_COLUMNS)
      .order('created_at', { ascending: false })
      .range(from, from + PAGE_SIZE - 1);
    if (error) throw error;
    return data;
  }, []);

  useEffect(() => {
    let isCancelled = false;
    fetchPage(0)
      .then((data) => {
        if (isCancelled) return;
        setEntries(data);
        setHasMore(data.length === PAGE_SIZE);
      })
      .catch(() => {
        if (!isCancelled) setErrorMessage('방명록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.');
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false);
      });
    return () => {
      isCancelled = true;
    };
  }, [fetchPage]);

  /** 다음 페이지를 이어서 불러온다. */
  const loadMore = useCallback(async () => {
    try {
      const data = await fetchPage(entries.length);
      setEntries((prev) => [...prev, ...data]);
      setHasMore(data.length === PAGE_SIZE);
    } catch {
      setErrorMessage('방명록을 불러오지 못했어요. 잠시 후 다시 시도해주세요.');
    }
  }, [entries.length, fetchPage]);

  /**
   * 방명록을 등록하고 목록을 새로고침한다.
   * @param {{ name: string, email: string, organization: string, emoji: string,
   *   message: string, photoFile: File|null }} values - 입력값
   */
  const addEntry = useCallback(async ({ name, email, organization, emoji, message, photoFile }) => {
    const photoUrl = photoFile ? await uploadPhoto(photoFile) : null;
    const { error } = await supabase.from('guestbook_entries').insert({
      name: name.trim(),
      email: email.trim() || null,
      organization: organization.trim() || null,
      emoji,
      message: message.trim(),
      photo_url: photoUrl,
    });
    if (error) throw error;
    const data = await fetchPage(0);
    setEntries(data);
    setHasMore(data.length === PAGE_SIZE);
    setErrorMessage('');
  }, [fetchPage]);

  return { entries, isLoading, hasMore, errorMessage, loadMore, addEntry };
}
