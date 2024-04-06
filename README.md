# Connect Remix and Prisma using RPC

As for Preview, Prisma now supports D1. However, the file size of Prisma's Wasm is large, so if you use it in combination with Remix, the file size after building will exceed 1MB.
Here is a code sample that separates Remix and Prisma using the RPC method announced by Cloudflare this week to communicate between workers.

https://blog.cloudflare.com/javascript-native-rpc

## Motivation

This repository consists of two Workers.

- Workers to access D1 with Prisma
- Cloudflare Pages Functions for Remix to work

Since Cloudflare Pages Functions created in Remix communicates with Workers to access D1 in Prisma using RPC, unlike normal Service Bindig, a type is defined for the return value from Prisma's Workers. Therefore, the usability of Remix is comparable to using Prisma normally.
