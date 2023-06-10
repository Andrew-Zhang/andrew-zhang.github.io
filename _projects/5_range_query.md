---
layout: page
title: Range Queries with Fractional Cascading
description: Created a data structure that combines KD-Trees, Range Trees, and fractional cascading to perform range queries while balancing time and space complexity.
img:
importance: 1
category: school
---

[code](https://github.com/leebri2n/CS3114-bestgroup/tree/main/CS3114-Project3)

Performs 3D range queries in sqrt(n) time and O(n) space. This is done by combining KD-Trees, Range Trees, and fractional cascading. The KD-Tree is used to find the points that are within the range in the x and y dimensions. The Range Tree is used to find the points that are within the range in the z dimension. We sped up the search along the z dimension with fractional cascading.