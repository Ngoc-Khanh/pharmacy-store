import { Button } from '@/components/ui/button';
import { routes } from '@/config';
import { motion } from 'framer-motion';
import { ChevronLeft, LucideIcon } from 'lucide-react';

interface InvoiceEmptyStateProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const InvoiceEmptyState = ({ title, description, icon: Icon }: InvoiceEmptyStateProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="text-center py-16 px-4"
  >
    <div className="mx-auto w-20 h-20 bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 rounded-full flex items-center justify-center mb-4 border border-emerald-100 dark:border-emerald-800/30 shadow-sm">
      <Icon className="w-10 h-10" />
    </div>
    <h2 className="mt-2 text-xl font-semibold">{title}</h2>
    <p className="mt-3 text-center text-muted-foreground max-w-md mx-auto">{description}</p>
    <Button
      asChild
      size="lg"
      className="mt-8 px-6 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700"
    >
      <a href={routes.store.medicines} className="flex items-center gap-2">
        <ChevronLeft className="h-4 w-4" />
        Tiếp tục mua sắm
      </a>
    </Button>
  </motion.div>
);