---
layout: post
title:  "Differential Evolution Implement with Matrix Operations in Pytorch."
date:   2021-11-02 14:18:00 +0700
tag: computerScience
---

## Introductions.

### what is Differential Evolution (DE)


For the basic implementation. your computer will run code with a processor. Using Pytorch's Matrix operation, we can make our code run faster, because pytorch's operation use many processor at once.

## Implementation and Explains

### Algorithm breakdown
#### Initialization
 - create an matrix with size(N,d)

as each iteration, we do:
#### Create Mutation
 - choose 3 random individual which we can do it by copying 3 times and shuffling it.
 - mutation population will be : ``` mutation = r1+ F*(r2-r3) ```

#### Create Offspring
 - let's rewrite the recombination code.
 - we can multiply a population matrix with an matrix of zero and one with exact size(Crs) to eleminate all the gene that we want to replaced with mutation.
 - then we can eliminate all the mutation gene that we want to replaced with original population by multiply it with ```Crs- = 1-Crs```(Crs-)
 - so now we have new offsrping population.```offspring = Crs*population +(1-Crs)*mutations```

#### Selection
 - same idea creat offspring but creating Crs differently.
 - Crs created by using the difference fitness of original population and fitness of offspring ``` Crs = f(population)-f(offspring)```
  - then turn all number <0 to 0 and all number >0 to 1 with ```torch.nn.Threshold```.
  New selection would be ```selected = Crs*population +(1-Crs)*offspring```
  - ```population = selected```

### Source code
```python
class DE:

    def __init__(self,N,d,f,g_max=100000,seed=18520937,save_gif=False,Maximize=False):
        self.N = N
        self.d = d
        self.f = f
        self.g_max = g_max
        self.seed = seed
        self.statistic_result = []
        self.Maximize = Maximize
        self.save_gif = save_gif
        self.best = 0
        if save_gif == True:
            self.generation_state = []
    def __call__(self):
        torch.random.manual_seed(self.seed)
        population = self._generate_population()
        population = (population*100)-50
        f_count = 0
        for i in range(self.g_max):
        
            print('percent {:2f}'.format((i/self.g_max)*100),end="\r")
            # lai ghép
            mutations = self._generate_mutations(population)
            to_zero = torch.nn.Threshold(0.5,0)
            to_one = torch.nn.Threshold(-0.5,1)
            Crs = self._generate_population()
            Crs = to_zero(Crs)
            Crs = to_one((-1*Crs))
            offspring = Crs*population +(1-Crs)*mutations

            #chọn lọc
            population = self._selection(population,offspring,self.Maximize)
            f_count+=self.N*2
            fitness = self.f(population)
            if self.Maximize:
                best = fitness.max()
                self.best =best
            else:
                best = fitness.min()
                self.best =best
            if i%1000==0:
                if self.save_gif:
                    self.generation_state.append({'population_state':population,'gen number':i})
                self.statistic_result.append({'eval_count':f_count,'best':best})
        return population
    def _generate_population(self):
        population = torch.rand(self.N,self.d)
        return population
    def _generate_mutations(self,population):
        r1 = population.clone()
        r1 = self._shuffle_population(r1)
        r2 = population.clone()
        r2 = self._shuffle_population(r1)
        r3 = population.clone()
        r3 = self._shuffle_population(r1)
        mutation = r1+ F*(r2-r3)
        return mutation
    def _shuffle_population(self,target):
        indexs = torch.randperm(self.N)
        t = target[indexs]
        return t
```