
The broader goal of the system is to provide a persistence layer over Baileys, in a way to make easier for other systems (e.g. AI agents) to communicate via WhatsApp. Why? Because Baileys can't fetch conversation history properly - it's mostly able to receive incoming messages and send replies. We'll assume the system will be active most of the time, in a on-prem machine; and because the official API is too complex for something that should be very very simple.

On a functional level, the system should be able to:
- monitor incoming messages and store them;
- notify/broadcast about new (incoming) messages;
- also store messages sent (if they are not already sent by Baileys, not sure)
- fetch conversation history (what was stored), with filters (e.g., person, timespan, last n, today, status)
- transact messages status, e.g., captured, notified, handled (by other systems)

Open questions:
- Inter system protocol
- Storage/persistence/database layer
- How to handle non-text (e.g., audios and other types)
- How external messages sent are handled

Let's design step by step. Ask me questions about it first.

