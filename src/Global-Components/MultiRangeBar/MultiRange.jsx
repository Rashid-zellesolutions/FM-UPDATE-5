import React from 'react'
import { CRangeSlider } from '@coreui/react-pro'

export const MultiRange = () => {
  return <CRangeSlider value={[25, 75]} labels={['Low', 'Medium', 'High']} />
}