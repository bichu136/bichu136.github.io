---
layout: posts
title:  "Try to Understand PGPE"
date:   2021-11-10 16:44:45 +0700
tag: computerScience
categories: computerScience
---

## Introduction.
by define the policy as a distribution over the parameters of a controller. The parameters are sampled from this distribution at the start of the sequence, and thereafter the controller is deterministic. Since the reward for each sequence depends on only a single sample, the gradient estimates are significatly less noisy, even in stochastic enviroments.

symmetric sampling improves both convergence time and final perfomance
## what is PGPE

### Policy Gradient with Parameter-Based Exploration
#### assummed proplem
representing
$a_t$
and $s_t$ by real value vectors. assume that the conditional probability distribution over the next states
$s_{t+1}$ is entirely determined by the preceeding state-action pair. we also assume that a stochastic policy suffices,.... the distribution over actions only depends on the current state and the real valued vector of agent parameters. $a_t$ ~ $p(a_t|s_t,\theta)$ .

Lastly, assume state action pair produces scalar result. we refer to length T sequence of state-action pairs produced by agent as an history h. h = \[$s_{1:T},a_{1:T}$\]




### tradition $J(\theta)$
which agent expected reward

$J(\theta)=\int_{H}p(h\| \theta)r(h)dh$
an obvious way to obtimize the expected reward is to estimate the $\triangledown_{\theta}J(\theta) $ and use it to carry out the gradient ascent optimization. Which the reward we get is independent with our paramters.

$\triangledown_{\theta}J(\theta) ~ \frac{1}{N}\sum_{n=1}^{N}\sum_{t=1}^{T}\triangledown_{\theta}p(a_{t}^{n}\|s_{t}^{n},\theta)r(h^{n})$
### way which PGPE approach.
PGPE addresses the variance problem by replacing the probabilistic policy with a probability distribution of parameter $\theta $.
$p(a_{t}\|s_t,\alpha) = \int_{\theta}\delta_{F_{\theta}(s_t),a_t}d\theta$

where $\alpha$ are the parameters determining the distribution over $\theta$
$F_{\theta}(S_t)$ is (determininstic) action chosen by the model with $\theta$ in state $s_t$. $\delta$ is the Dirac delta function.
and entire history. can be generated from a single parameter sample. this reduction samples per history is what reduce the variance in the gradient estimate.

bonus: the parameter is estimated directly so that backpropagate is not needed. which allow the non differentiable controller.

expected reward for PGPE


and the gradient for this reward function is.

$\triangledown_{\alpha}J(\alpha)~ \frac{1}{N}\sum_{N=1}{N}\log(\theta\|\alpha)r(h^n)$

assuming that \alpha is consist of a set of means and deviations that determine an independent normal distribution for each parameters $\theta_i$. with tweaks. give the derivative of $\log(p(\theta\|\alpha))$ with respect means and deviation


assuming $\alpha$ consist of a set of means and deviation that determine independent normal distribution of each param in \theta some rearangement give the following forms of the derivative of $\log p(\theta\|\alpha)$ wit respect means and deviation.

$\triangledown_{\mu}\log p(\theta\|\alpha) =  \frac{\theta_{i} - \mu_i}{ơ^2}$

$\triangledown_{\ơ^2}\log p(\theta\|\alpha) =  \frac{(\theta_{i} - \mu_i)^2-ơ^2}{ơ^3}$
### Sampling with baseline

we using average of result to be an expect result b of 1 generation. update according to the difference of b and r_i


PSUEDO CODE:
Initialize _u to u_init

Initialize _o to o_init

while TRUE do:
- for n=1 to N do
  - randomize Params[n] with distribution N(_u,I*_o^2)
  - r[n] = r(h(Params[n]))
- T =$ \[ t_{ij} \]_{ij}$<span>with $t_{ij} = \theta^{j}_{i} - \mu_i $</span>
- S = $\[ s_{ij} \]_{ij}$<span>with $s_{ij} = \frac{t_{ij} - ơ^2_i}{ơ_i} $</span>
- r = $ \[ (r_n-b) \]$
- update $\mu = \mu + learningRateTr$
- update $ơ = ơ + learningRateSr$

end while


### Symmetric sampling
randomize a pertubation Ɛ from Ɲ(0,Iơ^2) to create 2 policy's parameter Ө+ = μ + Ɛ | Ө- = μ - Ɛ we get a different deviation of result function.

this method reduce the problem of missleading baseline => improve μ gradient estimate
improve ơ gradient since both sample are equally probable under current distribution, reinforce each other as predictors of the benefit of altering ơ 

And yet, doing this require double the memory for updating ơ and μ

normalizing μ's gradient by dividing the gradient with the difference of m (max for now reward or maxium reward if known) and the mean reward of both  symmetric sample

normalizing ơ's gradient by dividing the gradient with the difference of m (max for now reward or maxium reward if known) and the baseline b


Initialize _u to u_init

Initialize _o to o_init
while TRUE do
- for n = 1 to N do
  - draw pertubation Ɛ ~ _(0,Iơ^2)
  - $\theta_{+n} = \mu+Ɛ$
  - $\theta_{-n} = \mu-Ɛ$
  - evaluate $r_{+n} = r(h(\theta+n))$
  - evaluate $r_{-n} = r(h(\theta-n))$
- end for
- T =$ \[ t_{ij} \]_{ij}$<span>with $t_{ij} = Ɛ $</span>
- S = $\[ s_{ij} \]_{ij}$<span>with $s_{ij} = \frac{(Ɛ_{i}^{j})^2 - ơ^2_i}{ơ_i} $</span>
- $r_T =[r_{+n,i}-r_{-n,i}]$
- $r_s =[\frac{r_{+n,i}+r_{-n,i}}{2}+b]$
- update $\mu = = \mu + learningRateTr_t$
- update $ơ = ơ +learningRateSr_s$
- update baseline b accordingly

end while

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
