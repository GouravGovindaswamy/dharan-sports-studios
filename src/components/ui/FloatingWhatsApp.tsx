import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { contact } from "../../data/content";
import { whatsappHref } from "../../lib/whatsapp";

export function FloatingWhatsApp() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.a
      href={whatsappHref(contact.whatsapp.number, contact.whatsapp.message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.4 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className="fixed bottom-6 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-sprout-500 text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-navy-950 sm:bottom-8 sm:left-8"
    >
      <span className="relative flex h-14 w-14 items-center justify-center">
        {!shouldReduceMotion && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sprout-500 opacity-30" />
        )}
        <MessageCircle className="relative h-6 w-6" />
      </span>
    </motion.a>
  );
}
