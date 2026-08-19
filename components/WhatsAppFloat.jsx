"use client";

import { motion } from "framer-motion";
import { useI18n } from "./I18nProvider";

/**
 * Persistent floating WhatsApp button — mounted once at the root layout so it
 * follows the visitor across every page, not just the Home.
 */
export default function WhatsAppFloat() {
  const { t } = useI18n();
  return (
    <motion.a
      href="https://wa.me/59100000000"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label={t("whatsappFloat.label")}
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.004 2.002c-7.732 0-14.002 6.27-14.002 14.002 0 2.468.654 4.876 1.896 6.99L2 30l7.192-1.884A13.94 13.94 0 0 0 16.004 30c7.732 0 14.002-6.27 14.002-14.002S23.736 2.002 16.004 2.002zm0 25.63a11.58 11.58 0 0 1-5.904-1.614l-.424-.252-4.392 1.152 1.172-4.284-.276-.44a11.57 11.57 0 0 1-1.776-6.192c0-6.396 5.204-11.6 11.6-11.6s11.6 5.204 11.6 11.6-5.204 11.63-11.6 11.63zm6.36-8.684c-.348-.176-2.064-1.02-2.384-1.136-.32-.116-.552-.176-.784.176s-.9 1.136-1.104 1.368c-.204.232-.404.26-.752.088-.348-.176-1.468-.54-2.796-1.724-1.032-.92-1.728-2.056-1.932-2.404-.204-.348-.02-.536.152-.708.156-.156.348-.404.52-.608.176-.204.232-.348.348-.58.116-.232.06-.436-.028-.608-.088-.176-.784-1.892-1.076-2.588-.284-.68-.572-.588-.784-.6-.204-.008-.436-.012-.668-.012s-.608.088-.928.436c-.32.348-1.22 1.192-1.22 2.908s1.248 3.372 1.424 3.604c.176.232 2.46 3.752 5.96 5.264.832.36 1.484.576 1.992.736.836.264 1.596.228 2.196.14.672-.1 2.064-.844 2.356-1.66.288-.816.288-1.516.204-1.66-.088-.148-.32-.232-.668-.408z" />
      </svg>
    </motion.a>
  );
}
