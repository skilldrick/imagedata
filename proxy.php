<?
if(isset($_GET["url"])) {
  $url = urldecode($_GET["url"]);
  $url = 'http://' . $url;
  $extension = substr($url, -3);

  switch ($extension) {
  case 'jpg':
    $mime = 'image/jpeg';
    break;
  case 'gif':
    $mime = 'image/gif';
    break;
  case 'png':
    $mime = 'image/png';
    break;
  default:
    $mime = false;
  }


  if ($mime) {
    header('Content-type: ' . $mime);
    $file = @fopen($url, 'rb');
    if ($file) {
      fpassthru($file);
      exit;
    }
    else {
      echo $file;
    }
  }
}
