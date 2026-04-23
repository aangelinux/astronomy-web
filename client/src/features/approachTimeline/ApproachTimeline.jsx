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
        Close Approaches: Timeline 1900-2026
      </h2>

      <TimelineControls
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleSubmit={handleSubmit}
        setInput={setInput}
        alert={alert}
      />

      <svg ref={svgRef}></svg>

      <TimelineTooltip hoverData={hoverData} />
    </div>
  )
}

export default ApproachTimeline