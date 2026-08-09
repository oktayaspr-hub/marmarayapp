# Inner Routes Integration

## Goal
Integrate the Pendik-Ataköy, Zeytinburnu, and Maltepe intermediate routes into `data.js` so they correctly show up in the "Canlý Takip" board on all days (including weekends) without breaking the S-Map visualization.

## Proposed Changes

### `wp-content/plugins/marmaray-core-v2/assets/js/data.js`
#### [MODIFY] `data.js`
1. Remove the `if (day !== 0)` restrictions in `getCalendarDayTrainRuns` so intermediate trains run every day.
2. Add the `Zeytinburnu - Maltepe` intermediate route to `getCalendarDayTrainRuns`.
3. Verify that `getLiveTrainsForStation` accurately handles the `originId` and distances for Zeytinburnu (ID: 11) and Maltepe (ID: 26).
4. No changes needed in `app.js` because it already filters out `isIntermediate` for map rendering, meaning the map will remain 100% stable while the board shows the new trains.

## User Review Required
Please confirm if this plan aligns with your expectations. I will NOT create any new plugins or change `app.js`. I will solely inject the exact mathematical train runs into `data.js`.
