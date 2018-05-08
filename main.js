validate.init({
  messageValueMissing: "Por favor, preencha esse campo.",
  messageTypeMismatchEmail: "Por favor, utilize um e-mail válido.",
});

var openVideo = document.getElementById('open-video'),
    videoFrame = document.getElementById('video-frame'),
    videoPreview = document.getElementById('video-preview'),
    body = document.getElementsByTagName('body')[0],
    showOn = document.getElementById('show-on');

openVideo.addEventListener('click', function() {

  if (!videoFrame.classList.contains('active')) {
    videoFrame.classList.add('active');
    videoPreview.classList.remove('active');
    body.classList.add('show-on');
  }

});

showOn.addEventListener('click', function() {

  if (body.classList.contains('show-on')) {
    body.classList.remove('show-on');
  } else {
    body.classList.add('show-on');
  }

});