'use client'

import { TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface StatsCardProps {
  label: string
  value: string
  trend?: string
}

export function StatsCard({ label, value, trend }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass rounded-2xl p-6"
    >
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-light">{value}</p>
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-xs text-primary">
          <TrendingUp className="h-3 w-3" />
          <span>{trend}</span>
        </div>
      )}
    </motion.div>
  )
}