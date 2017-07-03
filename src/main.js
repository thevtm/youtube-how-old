/*
 * Youtube How Old
 */

'use strict'

/* CONSTANTS */

const DAY_IN_MS = 24 * 60 * 60 * 1000
const WEEK_IN_MS = 7 * DAY_IN_MS
const MONTH_IN_MS = 30 * DAY_IN_MS
const YEAR_IN_MS = 365 * DAY_IN_MS

/* Data Source:
  <meta itemprop="datePublished" content="2016-09-18">
*/
const SELECTOR_QUERY = `meta[itemprop="datePublished"]`

/* Mount Point:
 *<div id="watch-uploader-info">
 * <strong class="watch-time-text">
 *    Published on Mar 25, 2017
 *  </strong>
 *</div>
 */
const MOUNT_POINT_QUERY = `#watch-uploader-info > .watch-time-text`

/* FUNCTIONS */

function applyTransform () {
  // 1. Get video`s published date
  const metaVideoPublishedDateElement = document.querySelector(SELECTOR_QUERY)

  console.debug(`Found metaVideoPublishedDateElement:`, metaVideoPublishedDateElement)

  // 1.1 Check if we got a valid <meta> element
  if (metaVideoPublishedDateElement == null) {
    // This is necessary due to the fact that the contentScript
    // is going to run in any page because of SPFJS.
    return
  }

  // 1.2 Parse date from <meta> element
  const videoPublishedDateStr = metaVideoPublishedDateElement[`content`]
  const videoPublishedDate = Date.parse(videoPublishedDateStr)

  console.debug(`Parsed date:`, videoPublishedDate)

  // 1.3 Check if the date is valid
  if (isNaN(videoPublishedDate)) {
    console.error(`Recived invalid date from element:`, metaVideoPublishedDateElement)
    return
  }

  // 2. Compare to current date
  const currentDate = Date.now()
  const deltaDate = currentDate - videoPublishedDate

  // 3. Format
  let formattedDate

  if (deltaDate >= YEAR_IN_MS) {
    const years = Math.floor(deltaDate / YEAR_IN_MS)
    formattedDate = (years === 1) ? `1 year ago` : `${years} years ago`
  } else if (deltaDate >= MONTH_IN_MS) {
    const months = Math.floor(deltaDate / MONTH_IN_MS)
    formattedDate = (months === 1) ? `1 month ago` : `${months} months ago`
  } else if (deltaDate >= WEEK_IN_MS) {
    const weeks = Math.floor(deltaDate / WEEK_IN_MS)
    formattedDate = (weeks === 1) ? `1 week ago` : `${weeks} weeks ago`
  } else if (deltaDate >= DAY_IN_MS) {
    const days = Math.floor(deltaDate / DAY_IN_MS)
    formattedDate = (days === 1) ? `1 day ago` : `${days} days ago`
  } else { // TODAY
    formattedDate = `today`
  }

  // 4. Insert date in the DOM
  const mountElement = document.querySelector(MOUNT_POINT_QUERY)
  const newDateText = `${mountElement.innerText} (${formattedDate})`

  mountElement.innerText = newDateText
}

/* EXECUTION */

// 1. Executes the extension when the page is loaded
applyTransform()

// 2. Hooks the extension to run everytime the SPFJS navigates to a different page
window.addEventListener(`spfdone`, () => applyTransform())
