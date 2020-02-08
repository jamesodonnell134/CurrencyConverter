<?php

// PHP code taken from the ECB site for PHP developers (cross-site with DEVWEB).
$XML=simplexml_load_file("https://devweb2019.cis.strath.ac.uk/~aes02112/ecbxml.php");

//the file is updated at around 16:00 CET

// The purpose of this code is to display the rates without having thr XML tree
// E.g USD,1.1048,JPY,120.52...
// Rates are then parsed in using JavaScript

foreach($XML->Cube->Cube->Cube as $rate) {
    //Output the value of 1EUR for a currency code
    echo $rate["currency"] . "," . $rate["rate"] . ',';
}
