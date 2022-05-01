# Preview it in production

## Why I built my own presentation toolkit

- I love engagement
- I wanted a proof of concept that's simple to understand, use and interact with but powerful enough to be used in production and not just for fun (although also just for fun). But main point was to demonstrate the technology that I'm going to be talking about and inspire you to think outside the box.

## Talking about webpack 👹

My associations with webpack were always connected to it's slowness, complexity and it's strange bundle outputs. For some time I couldn't wrap my head around why would any mortal want to impose it on themselves while there are so many other options.

### Let's bust few myths about it 💒

### Complexity

They made incredible progress in past few years and just the basic output.

Also look at the complexity and lack of control we had with tools like [grunt](https://github.com/ngbp/ngbp/blob/v0.3.2-release/Gruntfile.js) <- this was my first build toolchain that I used with Angular 1.x

### Slowness

Babel and TSC are quite slow <- might esbuild fix that?

I used to think that I knew how to setup webpack few years ago but in recent years I forgot about all the things that I had learned. But then I got exposed to the idea of webpack

#### Runtime

[More about runtime](https://segmentfault.com/a/1190000040067453/en)

## Federation and impact on the teams

### Definitions

> The action of forming states or organizations into a single group with centralized control.

> An organization or group within which smaller divisions have some degree of internal autonomy.

> A group of states with a central government but independence in internal affairs.

> Early 18th century: from French fédération, from late Latin foederatio(n-), from the verb foederare ‘to ally’, from foedus ‘league’.

### Webpack's own definition

Multiple separate builds should form a single application. These separate builds should not have dependencies between each other, so they can be developed and deployed individually.

This is often known as Micro-Frontends, but is not limited to that.

### Security

- Plugin based systems https://dl.acm.org/doi/10.1145/3233027.3233042

## Extension based systems

- Figmas take on that https://www.figma.com/blog/how-we-built-the-figma-plugin-system/
