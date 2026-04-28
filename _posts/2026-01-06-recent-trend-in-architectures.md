---
layout: post
title: "Recent Trend in Architectures"
date: 2026-01-06 00:00:00-0800
description: "A recurring recipe seems to be “more parallel computation paths, each narrower.”"
tags: [thought]
giscus_comments: true
related_posts: false
last_updated: 2026-01-07
---
<div>
<p>DeepSeek&#x2019;s recent paper on <a href="https://www.arxiv.org/pdf/2512.24880" target="_blank" rel="noopener noreferrer">Manifold-Constrained Hyper-Connections</a> blew up on Twitter. At a high level, it tries to stabilize a matrix multiply inside the residual stream by constraining the matrix so that its rows and columns sum to 1 to prevent vanishing or exploding activations.</p>
<p>However, I think the contribution of the original Hyper-Connections paper (that DeepSeek&#x2019;s paper is based on) is even more interesting. It reveals a broader trend in LLM architecture design. Compared to classic ResNet-style residuals, the key shift is that Hyper-Connections introduce many residual pathways, rather than relying on a single high-dimensional residual.</p>
<p>What&#x2019;s interesting is how often this pattern shows up elsewhere in Transformers:</p>
<ul> <li> <strong>Multihead Attention:</strong> many heads, each with a small head dimension </li>
<li> <strong>MoE:</strong> many expert MLPs, with sparse routing per token (especially when top_k is large) </li>
<li> <strong>Hyper-Connections:</strong> many residual branches </li> </ul>
<p>Across these components, a recurring recipe seems to be &#x201c;more parallel computation paths, each with lower dimension.&#x201d; Empirically, this trains faster than pushing everything through one wide path. If that is the pattern, the natural question is where else we can apply it. Attention, MLP, and residual pathways already cover most of the repeated blocks in a Transformer. What other parts could benefit from being split into many small, parallel routes? Off the top of my head, layer norm is the only remaining part that I can think of. Just a thought :)</p>
<p>Also another thought: I wonder how this would work for methods that extract hidden states from intermediate layers like Eagle 3. Would the features be more informative or would we just reuse the projection to combine the hidden states?</p>
</div>
