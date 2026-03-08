# Docker & Conteinerização

## 📌 Contexto

Todo ambiente corporativo construído pelo Agente é padronizado por encapsulamento. A imagem empacotada da UI/Api ali descrita é exatamente a mesma rodando no Mac do Dev júnior e no Cluster AWS EKS de milhões de reqs.

---

## 🧊 1. O Dockerfile Imutável, Leve e Multi-Stage Build

A lei suprema da Infra: Uma Imagem não deve carregar as suítes pesadas de testes ou bibliotecas do Node_Modules Development do programador em Prod.

- O Agente escreve estritamente abordagens Multi-Stage Files (`FROM node:20-alpine AS builder` -> Compila -> Dist/Build. Próximo `FROM gcr.io/distroless/nodejs` -> Traz apenas a /dist ou /build).
- O peso final do Contêiner Node ou React vai de GigaBytes para ínfimos MetaBytes (MB). Extremamente crucial para tempos curtos na Pull em Auto-Scales de tráfego Cloud e prevenção passiva contra exploits (Linux distro enxuto e C-Runtime minúsculo que sequer possui /bin/bash shell limitando RCEs severos no container do Host AWS).

## 🔒 2. A Hard Mode de Privilégios no Daemon

- Rodar API contêiner como root admin do Host e Docker Engine não deve acontecer. Declare um usuário `USER node_web` limitado. Use as portas nativas comuns mas sem mapear e expor de imediato em portas reservadas sistêmicas `1` a `1024`.
- Volumes persistem bancos e relatórios, não espere dados viverem no Container File-System (O Storage não persiste do Container desligado Kubernetes!). Armazene o Blob longo/vídeos massivos pro bucket Object Storage AWS S3 referencial nas ENV Variables e preserve a Memória stateless da imagem efêmera.
