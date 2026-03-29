Hi Andre, this is great.  
  
You've identified a use case that we missed: describing the current services.  
  
So here is what I think we've identified:  
  
1) "Forward" planner  
  

- solving for: where cna i provide service

  
  

- start with a transmitter configuration
    - cbsd position       (x, y)
    - antenna height      (z)
    - antenna azimuth     (w)
    - configurable defaults
    - antenna gain      (g)
    - antenna beamwidth (bw)   (default 12dB omni)
    - emission power    (e)    (default cat B max)

  
  

- missing info: receiver config

  
  

- solution: show potential service area (received dBm)
    - raster plus marching squares derived polygon

  
  
2) "Reverse" planner  
  

- solving for: how to i provide service to this location

  
  

- start with a receiver configuraiton
    - same as transmitter but antenna height defaults to building roof height

  
  

- missing info: tower location

  
  

- solution: identify potential serving towers
    - calculated and show multiple point to point links
    - each may/may not have an existing cbsd (option)

  
  
3) "Link" planner  
  

- solving for: how do i maximize service quality for one customer

  
  

- start with a transmitter and receiver configuration
    - adjust the parameters of both

  
  

- missing info: none

  
  

- solution: optimize for max link performance (typically SNR)
    - adjust and tune the transmitter and receiver configuration

  
  
4) "Network" optimizer   (NEW)  
  

- solving for: how do i maximize service quality for all customers

  
  

- start with existing transmitter configuration

  
  

- missing info: customer locations - must upload
    - allow upload of CSV data (x, y, z, w, g, bw)
    - configure minimum viable SNR
    - transmitter -> receiver pairing (we can infer via best path)

  
  

- solution:
    - option a: optimize transmitter configurations for (fixed) customer inventory
    - option b: optimize customer (receiver) configurations for (fixed) transmitters
    - option c: optimize all

  
  
There is still another, more mundane use case:  
  
5) "Network view"  
  

- solving for: describe my current service portfolio

  
  

- same as network optimizer but:
    - calculates existing network links
    - no optimization or tuning