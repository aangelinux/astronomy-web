/**
 * Renders an interactive timeline of close approaches to earth.
 */

import useTimeline from './useTimeline.jsx'
import TimelineControls from './TimelineControls.jsx'
import TimelineTooltip from './TimelineTooltip.jsx'
import InputAlert from '../alerts/InputAlert.jsx'

function ApproachTimeline() {
  const {
    year,
    alert,
    svgRef,
    hoverData,
    handlePrev,
    handleNext,
    handleSubmit,
    setInput
  } = useTimeline()

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>
        Close Approaches: Timeline
      </h2>

      <TimelineControls
        onPrev={handlePrev}
        onNext={handleNext}
        onSubmit={handleSubmit}
        setInput={setInput}
        alert={alert}
      />

      <svg ref={svgRef}></svg>

      <TimelineTooltip hoverData={hoverData} />
    </div>
  )
}

export default ApproachTimeline