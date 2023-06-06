import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import Banner from './Banner/Banner'
import ErrorFallback from './ErrorBoundary'
const CoinsTable = React.lazy(() => import("../Components/CoinsTable"))

const HomePage = () => {
  return (
    <>
      <Banner/>
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {
      }}>
        <Suspense fallback={<div>Loading...</div>}>
          <CoinsTable />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default HomePage
