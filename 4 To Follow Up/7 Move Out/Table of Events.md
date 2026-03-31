
| Order  | Event Name                       | Descriptions                          | Parameters                                                        |
| ------ | -------------------------------- | ------------------------------------- | ----------------------------------------------------------------- |
| 1      | thread:run:start                 | Main thread start                     | None                                                              |
| 2      | provider:fetch:start             | Population provider started preparing | None                                                              |
| 3      | provider:fetch:end               | Population is ready                   | None                                                              |
| 4      | client:reset_sas:start           | Client triggering a SAS reset         | None                                                              |
| 5¹     | client:register_fccs:start       | Client started registering FCC IDs    | fccIds: List[str]                                                 |
| 6¹     | client:register_users:start      | Client started registering Users      | users: List[str]                                                  |
| 7¹     | client:register_devices:start    | Client started registering Devices    | devices: List[Device]                                             |
| 5,6,7² | dispatcher:dispatch_batch:end    | Generic job ended                     | fn: Callable, batch: List                                         |
| 7³     | client:set_devices:start         | Set Devices to be emulated            | devices: List[Device]                                             |
| 8      | client:actuate_devices:start     | Started Device emulation cycle        | None                                                              |
| 9      | dispatcher:actuate_devices:start | Started Device emulation cycle        | None                                                              |
| 10³    | dispatcher:update_grants:start   | Started updating Grant states         | devicesIdx: List[int], new_states: List[List[GrantState]]         |
| 11³    | dispatcher:update_grants:end     | Grant states up to date               | stats*, devicesIdx: List[int], new_states: List[List[GrantState]] |
| 12     | dispatcher:actuate_devices:end   | Ended Device emulation cycle          | None                                                              |

  "thread:run:start": "Starting emulation thread",

         "Fetching/generating population",  

        "": "Resetting SAS",

        "": "Registering {max} Devices",

        "": "Registering {max} Users",

        "": "Registering {max} FCCs",

        "dispatcher:dispatch_batch:end" : "..{count} of {max} done",

        "client:actuate_devices:start": "Starting Device Emulation cycle",

    }
   on_dispatcher_actuate_devices_end
on_dispatcher_update_grants_end