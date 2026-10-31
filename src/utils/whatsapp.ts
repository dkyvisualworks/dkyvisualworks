/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { APP_CONFIG } from '../../appConfig.js';

/**
 * Returns the appropriate WhatsApp URL.
 * Directs desktop users directly to WhatsApp Web (https://web.whatsapp.com/send)
 * and mobile users to direct app launch (https://api.whatsapp.com/send).
 */
export const getWhatsAppUrl = (phone?: string, text: string = ''): string => {
  const targetPhone = (phone || APP_CONFIG.contact.whatsapp).replace(/\D/g, '');
  const encodedText = text ? encodeURIComponent(text) : '';

  const isMobile =
    typeof navigator !== 'undefined' &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    return `https://api.whatsapp.com/send?phone=${targetPhone}${encodedText ? `&text=${encodedText}` : ''}`;
  }

  // Directly navigate to WhatsApp Web on desktop browsers
  return `https://web.whatsapp.com/send?phone=${targetPhone}${encodedText ? `&text=${encodedText}` : ''}`;
};

/**
 * Opens WhatsApp Web (or WhatsApp Mobile on mobile devices) in a new tab.
 */
export const openWhatsApp = (phone?: string, text: string = ''): void => {
  const url = getWhatsAppUrl(phone, text);
  window.open(url, '_blank', 'noopener,noreferrer');
};
