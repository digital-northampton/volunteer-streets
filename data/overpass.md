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
