---
layout: post
title:  "Try to Understand PGPE"
date:   2021-11-10 16:44:45 +0700
tag: computerScience
---

## Introduction.
by define the policy as a distribution over the parameters of a controller. The parameters are sampled from this distribution at the start of the sequence, and thereafter the controller is deterministic. Since the reward for each sequence depends on only a single sample, the gradient estimates are significatly less noisy, even in stochastic enviroments.

symmetric sampling improves both convergence time and final perfomance
## what is PGPE

### Policy Gradient with Parameter-Based Exploration
#### assummed proplem
representing a_t and s_t by real value vectors. assume that the conditional probability distribution over the next states s_(t+1) is entirely determined by the preceeding state-action pair. we also assume that a stochastic policy suffices,.... the distribution over actions only depends on the current state and the real valued vector of agent parameters. a_t ~ _____ . Lastly, assume state action pair produces scalar result. we refer to length T sequence of state-action pairs produced by agent as an history h.

agent expected reward
$\sum_{n_1}^{10} x$


an obvious way to obtimize the expected reward is to estimate the delta____ and use it to carry out the gradient ascent optimization. Which the reward we get is independent with our paramters.


PGPE addresses the variance problem by replacing the probabilistic policy with a probability distribution of parameter

where p are the parameter determining the distribution over parameter
F_(S_t) is determininstic action chosen by the model with _ in state S_t 
### Sampling with baseline
...................
```
Initialize _u to u_init
Initialize _o to o_init

while TRUE do:
    for n=1 to N do
        draw Params[n] ~ N(_u,I*_o^2)
        r[n] = r(h(Params[n]))
    T = 
    S = 
    r = 

    update _u = _u + 
    update _o = _o + 

end while

```
### Symmetric sampling
randomize a pertubation Ɛ from Ɲ(0,Iơ^2) to create 2 policy's parameter Ө+ = μ + Ɛ | Ө- = μ - Ɛ we get a different deviation of result function.

this method reduce the problem of missleading baseline => improve μ gradient estimate
improve ơ gradient since both sample are equally probable under current distribution, reinforce each other as predictors of the benefit of altering ơ 

And yet, doing this require double the memory for updating ơ and μ

normalizing μ's gradient by dividing the gradient with the difference of m (max for now reward or maxium reward if known) and the mean reward of both  symmetric sample

normalizing ơ's gradient by dividing the gradient with the difference of m (max for now reward or maxium reward if known) and the baseline b

```
Initialize _ to __init
Initialize _ to ơ_init
while TRUE do 
    for n = 1 to N do 
        draw pertubation _ ~ _(0,Iơ^2)
        _+n = _+_
	_-n = _+_
	evaluate r+n = r(h(_+n))
        evaluate r-n = r(h(_-n))
    end for
    T = 
    S = 
    r_T = 
    r_s =
    update _ = 
    update _ = 
    update baseline b accordingly 
end while

```
## Experiment

## PGPE in Fitting Concrete Image
### Original approach 
Creating N params vectors for a run. render picture for that specific N param vector. then compare with ground truth image using MSE as loss function. update _ and _ accordingly as results.

with this approach our history array only have one element.
using ClipUp to optimize the gradient.
parameter will be randomize


### Our new approach

let state be the current picture, actions is a triangle will be drawn to the image, the next state is the image after drawing a triangle into. ressult will be the MSE from next state to ground_truth picture. endding until N step.

with this approach we have actuall history array with a finite number of element(N)

our parameter is an NN like so.

with ___ parameter. ____ than original approach.

using ClipUp to optimize the gradient
