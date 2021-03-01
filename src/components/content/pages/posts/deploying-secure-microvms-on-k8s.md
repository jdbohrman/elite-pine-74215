---
content_img_alt: firecracker
content_img_path: >-
  https://cdn.sanity.io/images/2m8mhojy/production/90eb6b6054c759a47943b78e6a88e0a9a718dc2d-1460x820.png
date: '2020-01-29'
excerpt: >-
  At their 2018 annual Re:Invent conference, AWS announced an exciting new
  product called "Firecracker" that is quickly setting the cloud-native
  ecosystem on fire. Firecracker is a Virtual Machine Manager (VMM) exclusively
  designed for running transient and short-lived processes. In other words, it
  is optimized for running functions and serverless workloads that require
  faster cold start and higher density.
layout: post
seo:
  description: A blog post about deploying MicroVM's on Kubernetes using Weave FireKube
  extra:
    - keyName: property
      name: 'og:type'
      value: article
    - keyName: property
      name: 'og:title'
      value: Best Waves - Surfing In Spain
    - keyName: property
      name: 'og:description'
      value: A intresting tale about Surfing
    - keyName: property
      name: 'og:image'
      relativeUrl: true
      value: images/4.jpg
    - name: 'twitter:card'
      value: summary_large_image
    - name: 'twitter:title'
      value: Best Waves - Surfing In Spain
    - name: 'twitter:description'
      value: A intresting tale about Surfing
    - name: 'twitter:image'
      relativeUrl: true
      value: images/4.jpg
  title: Deploying Secure Firecracker MicroVMs on K8s using Weave FireKube
  type: stackbit_page_meta
stackbit_url_path: /posts/deploying-secure-microvms-on-k8s
thumb_img_alt: weave-firekube
thumb_img_path: >-
  https://cdn.sanity.io/images/2m8mhojy/production/90eb6b6054c759a47943b78e6a88e0a9a718dc2d-1460x820.png
title: Deploying Secure Firecracker MicroVMs on K8s using Weave FireKube
---
## Introduction

At their 2018 annual Re:Invent conference, AWS announced an exciting new product called "Firecracker" that is quickly setting the cloud-native ecosystem on fire. Firecracker is[ a Virtual Machine Manager](https://github.com/firecracker-microvm) (VMM) exclusively designed for running transient and short-lived processes. In other words, it is optimized for running functions and serverless workloads that require a faster cold start and higher density.

Using the same technology that Amazon uses for AWS Lambda and AWS Fargate, Firecracker delivers the speed of containers with the security of VMs and has the potential to disrupt the current container and serverless technologies.

![](https://appfleet-com.cdn.ampproject.org/i/s/appfleet.com/blog/content/images/2020/01/diagram-desktop@3x.png)

## What is Weave Ignite?&#xA;&#xA;

While Firecracker has a ton of potential, it's still in its early stages so getting it up and running can be a bit tedious. The goal of **Ignite** is to solve this issue by adopting its developer experience from *containers*.

With Ignite, you just pick a container image that you want to run as a VM and then execute **ignite run** instead of **docker run**.

There’s no need to use VM-specific tools to build .vdi, .vmdk, or .qcow2 images, just do a docker build from any base image you want (e.g. ubuntu:18.04 from Docker Hub), and add your preferred content.

You can even use Buildpacks! As seen in my other blog post [here](https://appfleet.com/blog/using-buildpacks-to-provision-oci/). In this case, you would just follow the same steps, except you would build the image via the pack command.

## What is Firekube?

Firekube is a new open-source Kubernetes distribution that enables the use of Weave Ignite and GitOps to enable the setup of secure VM clusters. Firekube pulls everything from Git, detects your operating system and can boot up a secure cluster of VMs from nothing in 2.5 minutes.

A Firekube cluster has the following properties:

1.  Runs Kubernetes (now K8s, possibly K3s in future)

2.  High-grade VM security via the Firecracker KVM isolation

3.  Fast start-up and tear down of VMs e.g. for functions and [serverless apps](https://appfleet.com/)

4.  Scales from zero to production - uses standard k8s plugins for networking, etc

5.  “Lift and shift” software into VMs

6.  Run containers inside VMs or alongside VMs on the same CNI network

## Creating a Firekube Cluster

Firekube is a Kubernetes cluster working on top of [Ignite](https://github.com/weaveworks/ignite) and [Firecracker](https://github.com/firecracker-microvm/firecracker). Firekube clusters are operated with [GitOps](https://www.weave.works/technologies/gitops/).

[Ignite](https://github.com/weaveworks/ignite) and [Firecracker](https://github.com/firecracker-microvm/firecracker) only works on Linux as they need [KVM](https://en.wikipedia.org/wiki/Kernel-based_Virtual_Machine). However, it will also work on macOS using [footloose](https://github.com/weaveworks/footloose): the Kubernetes nodes are then running inside containers.

**Prerequisites**: Docker, Git, [kubectl 1.14+](https://v1-14.docs.kubernetes.io/docs/tasks/tools/install-kubectl/).

1.  Fork this repository.

2.  Clone your fork and cd into it. Use the SSH git URL as the script will push an initial commit to your fork:

3\. Start the cluster:

This step will take several minutes.

Export the KUBECONFIG environment variable as indicated at the end of the installation:

Enjoy your Kubernetes cluster!

## Watch GitOps in action

Now that we have a cluster installed, we can commit Kubernetes objects to the git repository and have them appear in the cluster. Let's add [podinfo](https://github.com/stefanprodan/podinfo), an example Go microservice, to the cluster.

A few seconds later, you should witness the apparition of a podinfo pod in the cluster:

To view podinfo web UI:

1.  Expose podinfo locally:

2\. Point your browser to http://127.0.0.1:9898:

![](https://appfleet-com.cdn.ampproject.org/i/s/appfleet.com/blog/content/images/2020/01/podinfo.png)

## Deleting a Firekube cluster&#xA;&#xA;

Run:

## Using a private git repository with firekube

To use a private git repository instead of a fork of wks-quickstart-firekube:

1.  Create a private repository and push the wks-quickstart-firekube master branch there. Use the SSH git URL when cloning the private repository:

2\. Create an SSH key pair:

3\. Upload the deploy key to your private repository (with read/write access):

![](https://appfleet-com.cdn.ampproject.org/i/s/appfleet.com/blog/content/images/2020/01/deploy-key.png)

4\. Start the cluster:


## Final thoughts

You've now learned the basic steps it requires to provision a Kubernetes cluster based on Firecracker VM's with Firekube. You should explore a bit of the different options the platform provides such as using Ignite to spin up MicroVM's with [Buildpack](https://appfleet.com/blog/using-buildpacks-to-provision-oci/) instead of Docker. I hope you liked this post, and I plan to dive into this a bit more in the future. Thanks for reading!
