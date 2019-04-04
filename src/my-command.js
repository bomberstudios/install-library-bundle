import sketch from 'sketch'
const Library = sketch.Library
const UI = sketch.UI

// documentation: https://developer.sketchapp.com/reference/api/

export default function() {
  UI.getInputFromUser(
    'URLs for Libraries',
    {
      description: 'Comma-separated list of RSS or Sketch Cloud links',
      initialValue: 'https://…',
    },
    (err, value) => {
      if (err) {
        // most likely the user canceled the input
        return
      } else {
        parseInput(value)
      }
    }
  )
  // var feeds = [
  //   'https://foobar.com/feed1.xml',
  //   'https://foobar.com/feed2.xml',
  //   'https://foobar.com/feed3.xml'
  // ]
  //
  
}

function parseInput(urlList){
  var feeds = urlList.split(',')
  feeds.forEach(rss => {
    // Trim whitespace, just in case there were spaces around the commas
    rss = rss.trim()
    // Extract RSS link from Cloud links
    if (rss.indexOf('https://sketch.cloud') != -1) {
      // This is a Cloud share, grab the RSS link for it
      rss = rss.replace('https://sketch.cloud/s/','https://client.sketch.cloud/v1/shares/') + '/rss'
    }
    UI.message(`Downloading Library…`)
    var lib = Library.getRemoteLibraryWithRSS(rss, (err, library) => {
      if (err) {
        UI.message(`Error downloading ${rss}`)
      } else {
        UI.message(`${library.name} installed`)
      }
    })
  })
}