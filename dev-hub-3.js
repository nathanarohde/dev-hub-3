<script>
// Requirements
// adaptors should be invoked when submit or non-domain link is clicked
// link events push href of outgoing link
// adaptors must check for client (assume multiple adaptors can be used)
// adaptors do not share the same list.
// format event properly


// Process
// add event listeners to non-domain anchor elements and submit buttons
// intercept event
// check adaptors and which one wants what
// give adaptors the content they require
// destroy listeners - *Depends on what browsers you support and if they handle memory leaks on their own
// execute orginal event


// Possible performance optimization iterating over DOM tree only once rather than seperate time for anchors and submit buttons

var anchors = document.getElementsByTagName("a");

// naming conventions in javascript must be camelCase. '-' will not work because as a naming convention because of JS handle the symbol
// needed to remove event listeners if not required this can be skipped
var callLinks = [];
var facebookLinks = [];
var outgoingLinks = [];

// check if anchor element meets event criteria, if so add listener
for (var i = 0; i < anchors.length; i++) {
  var anchor = anchors[i];
  var anchorHref = anchor.getAttribute("href");
  // All links except those that are internal (i.e of the same domain name) require an event listener therefore
  // compare anchorHref to window.href.url
  // for each link grab content between https:// / (or end of url if no /) or http:// / (or end of url if no /)
  // if (compare anchorHref to window.href.url )
  anchorsWithListener.push(anchor);
  assignAnchorListener(anchor);
};

function assignAnchorListener(anchor) {
  var anchorHref = anchor.getAttribute("href");
  switch(true) {
    case /tel:/.test(anchorHref):
    anchor.addEventListener('click', callLink);
    break;
    case /facebook/.test(anchorHref):
    anchor.addEventListener('click', facebookLink);
    break;
    default:
    anchor.addEventListener('click', outgoingLink);
  }
}

// seperate functions used to allow for link type specific behaviors if necessary, also required for removeEventListener to work properly if browser memory leaks are a concern.
function callLink(event) {
  linkClick(event);
}

function facebookLink(event) {
  linkClick(event);
}

function outgoingLink(event) {
  linkClick(event);
}

function linkClick(event) {
  event.preventDefault();
  adaptorCheck(event.target);
  // If concerned about memory leaks
  destroyEventListeners();
  // can only execute after previous two functions complete what is done depends on whether ES5 or ES6 standard is being used. (callbacks, promises, etc.)
  // getAttribute may not be valid property of event.target, if so this must be passed another way
  window.location = event.target.getAttribute("href");
}

var submitButtons = document.querySelectorAll("[type='submit']")
var submitButtonsWithListener = [];

for (var i = 0; i < submitButtons.length; i++) {
  var submitButton = submitButtons[i];
  submitButtonsWithListener.push(submitButton);
  assignSubmitButtonListener(submitButton);
}

function assignSubmitButtonListener(submitButton) {
  submitButton.addEventListener('click', submitClick )
}

function submitClick(event) {
  // Intercept don't submit yet
  event.preventDefault();
  adaptorCheck(this);
  destroyEventListeners();
    // can only execute after previous two functions complete what is done depends on whether ES5 or ES6 standard is being used. (callbacks, promises, etc.)
  form.submit();
}

// adaptor check may be same or seperate depending on requirements
function adaptorCheck(element) {
  // Check adaptor requirements in Analytics adaptors object
  // google analytics
  if (window.ga){ executeGoogleAnalyticsAdaptor(element); }

  if ( ? ) { executeMixPanelAdaptor(element); }

  if ( ? ) { executeOptimizelyAdaptor(element); }
}

// https://developers.google.com/analytics/devguides/collection/analyticsjs/sending-hits
function executeGoogleAnalyticsAdaptor(element) {
  // access Analytics get requirements
  ga('send', {});
}

function executeMixPanelAdaptor(element) {
  // access Analytics get requirements
  // us MixPanel js method or send XMLHttpRequest
}

function executeOptimizelyAdaptor(element) {
  // access Analytics get requirements
  // us Optimizely js method or send XMLHttpRequest
}

// If browser memory leaks are a concern.
function destroyEventListeners(){
  for (var i = 0; i < callLinks.length; i++) {
    callLinks[i].removeEventListener('click', callLink);
  }
  for (var i = 0; i < facebookLink.length; i++) {
    facebookLinks[i].removeEventListener('click', facebookLink);
  }
  for (var i = 0; i < outgoingLinks.length; i++) {
    outgoingLinks[i].removeEventListener('click', outgoingLink);
  }
  for (var i = 0; i < submitButtonsWithListener.length; i++) {
    submitButtonsWithListener[i].removeEventListener('click', submitClick);
  }
}

Analytics({
  adaptors: [
    {
      adaptor: 'googleanalytics',
      options: here,
      ...
    },
    {
      adaptor: 'mixpanel',
      apiKey: 'XXXXXXXXXXXXXXXXXX'
    }
  ],
  options: here
  ...
});
})();
</script>
