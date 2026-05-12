import { useEffect, useState } from 'react';
import { mockCurrentUser } from '../mock/data';

const CURRENT_USER_AVATAR_KEY = 'transportalia-current-user-avatar';
const CURRENT_USER_AVATAR_EVENT = 'transportalia-current-user-avatar-change';

function readCurrentUserAvatar() {
  if (typeof window === 'undefined') return mockCurrentUser.avatar;

  return localStorage.getItem(CURRENT_USER_AVATAR_KEY) || mockCurrentUser.avatar;
}

export function persistCurrentUserAvatar(nextAvatarSrc: string) {
  if (typeof window === 'undefined') return;

  localStorage.setItem(CURRENT_USER_AVATAR_KEY, nextAvatarSrc);
  window.dispatchEvent(new CustomEvent(CURRENT_USER_AVATAR_EVENT, { detail: nextAvatarSrc }));
}

export function useCurrentUserAvatar() {
  const [avatarSrc, setAvatarSrc] = useState(readCurrentUserAvatar);

  useEffect(() => {
    const syncAvatar = (event: Event) => {
      const nextAvatarSrc = (event as CustomEvent<string>).detail;
      setAvatarSrc(nextAvatarSrc || readCurrentUserAvatar());
    };

    const syncFromStorage = () => {
      setAvatarSrc(readCurrentUserAvatar());
    };

    window.addEventListener(CURRENT_USER_AVATAR_EVENT, syncAvatar);
    window.addEventListener('storage', syncFromStorage);

    return () => {
      window.removeEventListener(CURRENT_USER_AVATAR_EVENT, syncAvatar);
      window.removeEventListener('storage', syncFromStorage);
    };
  }, []);

  return avatarSrc;
}
