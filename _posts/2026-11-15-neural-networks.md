---
layout: post
title: "3B1B Neural Networks: Part 1"
date: 2026-11-15
description: "Neurons and Network"
categories: [
    "Machine Learning",
    "Deep Learning",
    "Neural Networks",
    "3B1B"
]
---
# Neural Networks
Part 1 of my notes on the 3B1B [Neural Network series](https://youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)

## Neurons and activation
- A neuron holds a number — the *activation*. High activation = the neuron "lights up".
- With sigmoid, activation lands in [0,1]. That range is a property of the **activation function**, not of neurons in general — modern networks mostly use ReLU, where activations are unbounded above.
- More precisely, a neuron isn't a stored number — it's a *function*. It takes the activations of the previous layer and spits out its own activation. The entire network is likewise one big function.
- So an activation only exists while data flows forward; nothing is kept between inferences. (During *training* they are cached, because backprop needs them.)
- Loosely analogous to brain neurons, but the mapping is weak: biological neurons fire discrete spikes, so an activation is closer to a firing *rate* than to a neuron's state.

## Network shape (MNIST)
- Input: 28×28 = 784 pixels → 784 input neurons, one per pixel, value encoding brightness.
- Input values sit in [0,1] because brightness is **normalized** (0–255 divided by 255) during pre-processing.
- Output: 10 neurons, one per digit; activation = how strongly the network thinks the image is that digit. These are in [0,1] because of sigmoid, and they do **not** sum to 1 — they aren't probabilities. (Softmax is what gives you a probability distribution.)
- This model: 2 hidden layers, 16 neurons each — picked arbitrarily, for the visuals.
- Every neuron in a layer connects to every neuron in the next — indicating how each activation influences the next layer's activations. Some connections are stronger than others.

## Why layers might work
- Hope: each hidden neuron fires on a *subcomponent* — e.g. the loop or the stroke that make up a 9.
- Layer 2 neurons ≈ specific edges → layer 3 neurons ≈ larger-scale patterns → output neuron ≈ the digit.
- Same shape in speech: raw audio → distinct sounds → syllables → words.
- This is the motivating *story*, not what the trained network actually does. When you inspect the learned weights of this network, they look close to random noise rather than clean edge detectors.

## Weights and bias
- To make a layer-2 neuron fire on a particular edge: give positive weights to the input neurons at the edge's pixels, and *negative* weights to surrounding pixels, so the neuron fires on an edge rather than a blob.
- A weight is a learned multiplier on a previous-layer activation. Positive → previous neuron being on pushes this one on; negative → pushes it off.
- Activation = weighted sum of previous activations, plus bias, squished into [0,1] by **sigmoid** (logistic curve): very negative → ~0, very positive → ~1. So `a' = σ(w·a + b)`.
- The weighted sum itself has no bounds, which is why the squishing is needed.
- **Bias** shifts the input to sigmoid, moving where the neuron starts to care. Effectively `−b` is the threshold the weighted sum must clear before the neuron is meaningfully active. Positive bias = easier to activate, negative = harder.
- In short: *weighted sum = what pattern the neuron picks up on; bias = how big that sum must be before the neuron fires.*

## Q&A
- Why do MNIST digits have to be centered? Is there similar pre-processing for other CNN-based models — is it CNN-specific or does it extend to Transformers?
	- The network has no translation invariance. Each input pixel is mapped to a fixed weight for a fixed input neuron. If a digit, let’s say “7” is shifted 5px, it lights up a completely different set of neurons than the ones the network learned to associate with “7”, so it fails. Centering/normalizing removes that variance. CNNs reduce this need, because convolution + shared weights give some translation invariance. Transformers on raw pixels still need position handling (patches + positional embeddings), but it doesn’t need centering the way a plain MLP does. Attention can relate any patch to any patch regardless of position.
- How can the brain identify digits with almost no compute or time, while computers need so much power and possibly training time for the same task? What's the difference?
	- Out of scope for this blog. Stay tuned :)
- Why pick 2 hidden layers of 16 neurons? What's the actual criteria for choosing hyperparameters — depth and width?
	- There’s no formula to say the optimal depth and width for a network for a task. It’s an emperical search, same as the arbitrary 2x16 in this lesson. Start from the known good architectures for the problem domain, and tune via experimentation. More capacity until the validation performance stops improving or starts overfitting.
- Why this specific structure (fully-connected layers) for a neural network?
	- A fully connected layer assumes nothing about the relationship between the variables. Every input neuron connects to every output neuron with an independent weight. If you have no prior knowledge of which pixels interacts with which, a fully connected layer allows the network to learn arbitrary interactions from scratch. Also mathematically, a feed forward network with a non-linear activation functions is a universal function approximator.
- Why do we need bias at all?
	- Just like the intercept (+c) in the linear equation `y = mx + c`, the bias shifts the decision boundary or activation function up, down, left or right. Without bias, every neuron’s decision boundary is forced through the origin (`w·a = 0`).

## References
- [Neural networks — 3Blue1Brown](https://www.3blue1brown.com/lessons/neural-networks/)
