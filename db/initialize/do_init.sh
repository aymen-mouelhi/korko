#!/usr/bin/env bash
for i in *.json;
do
	COLLECTION=${i/.json/}
	echo "Importing: " $COLLECTION

	mongo pinboard --eval "db.${COLLECTION}.drop()"
	mongoimport --jsonArray -d pinboard -c $COLLECTION $i
done

exit
