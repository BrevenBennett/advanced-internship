import React from 'react'

export default function Skeleton({ width, height, borderRadius }: any) {
  return (
    <div className='skeleton-box'
    style={{
        width,
        height,
        borderRadius
    }}></div>
  )
}
