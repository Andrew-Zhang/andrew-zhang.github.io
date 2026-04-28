---
layout: post
title: "Thought on TTT-E2E"
date: 2026-01-13 00:00:00-0800
description: "Just read the TTT-E2E paper and had some informal thoughts."
tags: [thought]
giscus_comments: true
related_posts: false
last_updated: 2026-01-15
---
<div>
<p>Just read the TTT-E2E paper and had some informal thoughts. It seems like the critical weakness is hardware efficiency. Due to TTT&#x2019;s nonlinear recurrence, they must approximate with minibatch TTT. Furthermore, they sequentially backprop through the TTT layers, which is inefficient. </p>
<p>These two weaknesses led me to wonder about a possible research direction. Can we approximate the last hidden state with a simple linear draft model (similar to Eagle 1&#x2019;s architecture and regression objective) rather than using cross entropy loss across the entire vocab. Then the recurrence would be linear (and possibly parallelizable with chunkwise parallel form) and the backprop would be minimal. Furthermore, to parallelize across layers, hidden states could be extracted from multiple layers, similar to Eagle 3.</p>
</div>
