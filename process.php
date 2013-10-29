<?php
 
    require "db_functions.php"; // Hämta db_functions.php
    //Globala variabler
   
    $db = open_db(); //Databasen öppnas
    $userid = 1;
   
            $badgeArray = array();
            $qry = 'SELECT complete, name FROM customer_badge as cb, badge as b WHERE c_id = ' . $userid . ' AND cb.b_id = b.b_id';
            //$qry = 'SELECT complete FROM customer_badge';
            $result = query_db($qry,$db);

            while($res = mysql_fetch_object($result)) {
                $theresult = array(
                    'status' => $res->complete,
                    'name' => $res->name,
                );
                array_push($badgeArray, $theresult);

            }

             echo json_encode($badgeArray);
?>