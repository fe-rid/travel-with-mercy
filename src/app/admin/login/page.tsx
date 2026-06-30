"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Compass, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/Toast";

export default function AdminLoginPage() {
  const router = useRouter();
  const { addToast } = useToast();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error || "Invalid login credentials");
        addToast(res.error || "Login failed", "error");
        setLoading(false);
      } else {
        addToast("Signed in successfully as Admin!", "success");
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError("An unexpected error occurred. Please try again.");
      addToast("An error occurred during sign in", "error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050E1A] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Logo / Brand header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-full bg-gold/10 border border-gold/30 mb-2">
            <Compass className="h-8 w-8 text-gold animate-spin-slow" />
          </div>
          <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-widest text-white">
            TRAVEL WITH <span className="text-gold">MERCY</span>
          </h1>
          <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">
            Concierge Portal Login
          </p>
        </div>

        {/* Login Form Card */}
        <Card className="border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl text-white">
          <CardHeader>
            <CardTitle className="text-xl text-center text-white">Admin Authentication</CardTitle>
            <CardDescription className="text-center text-white/50">
              Enter your credentials to access the management portal.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-200 p-3 rounded-lg text-sm flex items-start gap-2 animate-shake">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-white/60 font-semibold">
                  Email Address
                </label>
                <Input
                  type="email"
                  required
                  placeholder="admin@travelwithmercy.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white placeholder:text-white/20 h-11"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-white/60 font-semibold">
                  Password
                </label>
                <Input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="bg-white/5 border-white/10 focus:border-gold focus:ring-gold text-white placeholder:text-white/20 h-11"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gold hover:bg-gold-hover text-navy font-bold py-6 rounded-lg text-sm uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 border border-gold hover:border-gold-hover"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Footer text */}
        <p className="text-center text-xs text-white/30 font-light">
          Authorized personnel only. Sessions are monitored and logged.
        </p>
      </div>
    </div>
  );
}
