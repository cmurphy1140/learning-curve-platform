'use client'

import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="module-card group"
    >
      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-primary/20 to-accent/20">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="mb-2 text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}