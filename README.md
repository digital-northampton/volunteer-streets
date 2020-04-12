# volunteer-streets

https://digital-northampton.github.io/volunteer-streets/

Assignment of COVID19 volunteers to streets in the county based on location 

## Development

```sh
npm install;
npx serve;
```

The site will be at `http://localhost:5000/docs/`

## Deployment

Commits to the master branch are automatically deployed to Github Pages.

## Data sources

Postcode data came from the [Doogal](https://www.doogal.co.uk).

Volunteer data came from the Digital Northampton `volunteer-map` repo.

## Processing Data

```sh
npm install;
node process-county-postcodes.js; # Build postcode summary table
node process-streets.js;
node process-streets-2.js;
```
