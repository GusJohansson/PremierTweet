<?php

// Ska en kontakt mellan servern och dess databas
function open_db() {
	require "db_var.inc"; // hämta databas variablerna
		
	if (!($link = mysql_connect($db_server, $db_login, $db_password))) { // Ansluter till databasservern
		echo "<p>Couldn't connect to the mysql server: <br>\n".
			mysql_errno().":".mysql_error()."</p>\n";	
		return 0;
	}
	if (!mysql_select_db($db_name, $link)) { // Select the database
		echo "<p>Couldn't select the database: <br>\n".
			mysql_errno($link).":".mysql_error($link)."</p>\n";	
		return 0;
	}
	return $link;
}

// Skickar en SQL-förfrågning till Databasen
function query_db($query, $link) {
	stripSlashes($query);
	if (!($result = mysql_query($query, $link))) {
		echo "<p>Something went wrong with the SQL query: <br>\n".
			mysql_errno($link).":".mysql_error($link)."</p>\n";	
		return 0;
	}
	return $result;
}

// Stänger anslutningen till databasen
function close_db($link) {
	if (!mysql_close($link)) {
		echo "<p>Something went wrong when closing the connection: <br>\n".
			mysql_errno($link).":".mysql_error($link)."</p>\n";	
		return 0;
	}
	return 1;
}

?>
