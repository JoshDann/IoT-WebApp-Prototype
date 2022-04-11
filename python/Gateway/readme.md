# Python Database Implementation for Audeci
This directory contains all of the database code needed for commiting readings to the database.
I put it here mainly to avoid having to make an entirely new directory for it.

---

# Issues
## pymongo throwing `ServerSelectionTimeoutError`?
current pymongo version does not work
must be 3.11.3 (`pip install pymongo==3.11.3`)
*this may be due to me running on python 3.9.6*