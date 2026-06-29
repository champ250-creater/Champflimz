import { Button } from "@champflimz/ui";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@champflimz/ui";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 gap-16">
      
      <section className="text-center max-w-3xl px-6">
        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-balance tracking-tight">
          Welcome to the new <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-400)] to-[var(--color-accent-600)]">ChampFlimz</span>
        </h1>
        <p className="text-lg md:text-xl text-[color-mix(in_srgb,var(--foreground)_70%,transparent)] mb-10 max-w-2xl mx-auto">
          The Luminary Design System. Deep electric teal, warm undertones, and micro-interactions that feel alive.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg">Start Watching</Button>
          <Button variant="secondary" size="lg">Explore Library</Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-6">
        <Card>
          <CardHeader>
            <CardTitle>Cinematic Feel</CardTitle>
            <CardDescription>Colors designed for movie lovers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[color-mix(in_srgb,var(--foreground)_80%,transparent)]">
              We replaced pure black with warm, subtle undertones that don&apos;t strain the eyes, making marathon sessions effortless.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost">Learn more</Button>
          </CardFooter>
        </Card>

        <Card className="glass-panel relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent-500)] rounded-full blur-[80px] opacity-20 pointer-events-none" />
          <CardHeader>
            <CardTitle>Glassmorphism</CardTitle>
            <CardDescription>Depth and dimension</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[color-mix(in_srgb,var(--foreground)_80%,transparent)]">
              Used deliberately on surfaces like this card to create an ambient, premium feel without visual clutter.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="glass">Glass Button</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fluid Motion</CardTitle>
            <CardDescription>Meaningful interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-[color-mix(in_srgb,var(--foreground)_80%,transparent)]">
              Every button press, hover, and page transition uses carefully crafted easing curves to feel responsive and alive.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline">Try Hover</Button>
          </CardFooter>
        </Card>
      </section>

    </div>
  );
}
