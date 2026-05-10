import { motion } from 'framer-motion'
import { loadingSkeletonVariants } from '../utils/animations'

interface SkeletonLoaderProps {
  lines?: number
  width?: string
  height?: string
  className?: string
}

export default function SkeletonLoader({
  lines = 3,
  width = 'w-full',
  height = 'h-4',
  className = '',
}: SkeletonLoaderProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <motion.div
          key={i}
          className={`${width} ${height} rounded bg-secondary`}
          variants={loadingSkeletonVariants}
          animate="loading"
        />
      ))}
    </div>
  )
}

// Skeleton for project cards
export function ProjectCardSkeleton() {
  return (
    <div className="p-3 rounded border border-border space-y-2">
      <motion.div
        className="w-full h-4 rounded bg-secondary"
        variants={loadingSkeletonVariants}
        animate="loading"
      />
      <motion.div
        className="w-3/4 h-3 rounded bg-secondary"
        variants={loadingSkeletonVariants}
        animate="loading"
      />
      <div className="flex gap-1 pt-1">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-12 h-3 rounded bg-secondary"
            variants={loadingSkeletonVariants}
            animate="loading"
          />
        ))}
      </div>
    </div>
  )
}

// Skeleton for profile card
export function ProfileCardSkeleton() {
  return (
    <div className="p-4 space-y-4">
      {/* Avatar */}
      <motion.div
        className="w-24 h-24 rounded-full bg-secondary mx-auto"
        variants={loadingSkeletonVariants}
        animate="loading"
      />
      
      {/* Name & title */}
      <div className="space-y-2 text-center">
        <motion.div
          className="h-5 w-3/4 rounded bg-secondary mx-auto"
          variants={loadingSkeletonVariants}
          animate="loading"
        />
        <motion.div
          className="h-3 w-1/2 rounded bg-secondary mx-auto"
          variants={loadingSkeletonVariants}
          animate="loading"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <motion.div
          className="flex-1 h-8 rounded bg-secondary"
          variants={loadingSkeletonVariants}
          animate="loading"
        />
        <motion.div
          className="flex-1 h-8 rounded bg-secondary"
          variants={loadingSkeletonVariants}
          animate="loading"
        />
      </div>
    </div>
  )
}
