# Overpass

https://wiki.openstreetmap.org/wiki/Overpass_API/Overpass_API_by_Example
https://overpass-turbo.eu


Get all streets in Northamptonshire as txt list

```
[out:csv("name";false)];
area[name="Northamptonshire"];
way(area)[highway][name];
out;
```

Get the same as XML, includes more data

```
area[name="Northamptonshire"];
way(area)[highway][name];
out;
```

Get all the ways within a bounding box

```
way(50.746,7.154,50.748,7.157);
/*added by auto repair*/
(._;>;);
/*end of auto repair*/
out body;
```

Get way by ID as JSON

```
[out:json];way(787869930);(._;>;);out body;
```
