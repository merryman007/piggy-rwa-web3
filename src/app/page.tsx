'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vault, TrendUp, Shield, Users, ChartLine, Buildings, X, TelegramLogo, FileText } from "phosphor-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Secure 
              <span className="text-primary"> DeFi Vaults</span>
              <br />
              Access <span className="text-secondary">Real Assets</span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="font-body text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A friendly yet trustworthy platform where your assets find security and growth. Simplified DeFi with transparent access to tokenized real estate opportunities.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                <Link href="/dashboard">
                  <Vault weight="fill" className="w-5 h-5 mr-2" />
                  Start Saving
                </Link>
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 border-2 text-foreground hover:bg-accent/10 hover:text-accent-foreground hover:border-accent">
                <Link href="/properties">
                  <Buildings weight="regular" className="w-5 h-5 mr-2" />
                  Explore Assets
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Security Stats */}
      <section className="py-20 bg-card">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Built on Trust & Transparency
            </h2>
            <p className="font-body text-muted-foreground">Real numbers from real users who trust HavenFi with their assets</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {[
              { 
                icon: ChartLine, 
                value: "$2.5M+", 
                label: "Assets Secured", 
                color: "text-primary", 
                bg: "bg-primary/10", 
                iconBg: "bg-primary",
                delay: 0.1 
              },
              { 
                icon: Users, 
                value: "450+", 
                label: "Trusted Users", 
                color: "text-secondary", 
                bg: "bg-secondary/10", 
                iconBg: "bg-secondary",
                delay: 0.2 
              },
              { 
                icon: Buildings, 
                value: "25", 
                label: "Verified Properties", 
                color: "text-accent-foreground", 
                bg: "bg-accent/20", 
                iconBg: "bg-accent",
                delay: 0.3 
              },
              { 
                icon: Shield, 
                value: "100%", 
                label: "Asset Transparency", 
                color: "text-secondary", 
                bg: "bg-secondary/10", 
                iconBg: "bg-secondary",
                delay: 0.4 
              }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: stat.delay }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <Card className="p-6 transition-all duration-200 group-hover:shadow-lg border-0 bg-background/60 backdrop-blur">
                  <CardContent className="p-0 text-center">
                    <div className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <stat.icon weight="fill" className="w-6 h-6 text-white" />
                    </div>
                    <div className={`font-heading text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="font-body text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section - Trust & Education Focus */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why HavenFi is Your Trusted Guide
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-3xl mx-auto">
              We simplify complex DeFi concepts and prioritize transparency in every step of your journey
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Vault,
                title: "Simple Savings, Smart Growth",
                description: "No complex DeFi jargon. Just secure savings that grow with transparent, real-world assets. Every step explained in simple terms.",
                bgColor: "bg-primary",
                delay: 0.2,
                badge: "Easy to Use"
              },
              {
                icon: Buildings,
                title: "See Every Property Detail",
                description: "View actual property photos, legal documents, and performance data. Complete transparency means you know exactly where your money works.",
                bgColor: "bg-secondary",
                delay: 0.4,
                badge: "100% Transparent"
              },
              {
                icon: Shield,
                title: "Security Without Friction",
                description: "Bank-level security that's simple to set up. Multi-factor protection and audit reports from trusted firms keep your assets safe.",
                bgColor: "bg-accent",
                delay: 0.6,
                badge: "Audited & Secure"
              }
            ].map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: feature.delay }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 border-0 bg-card relative overflow-hidden">
                  <CardContent className="p-0 relative z-10">
                    {/* Trust Badge */}
                    <Badge className="mb-4 bg-accent/20 text-accent-foreground border-0 text-xs font-medium">
                      {feature.badge}
                    </Badge>
                    
                    {/* Icon */}
                    <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                      <feature.icon weight="fill" className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-heading text-xl font-bold text-foreground mb-4">{feature.title}</h3>
                    <p className="font-body text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Learn More Link */}
                    <motion.div 
                      className="mt-6 flex items-center text-primary hover:text-primary/80 font-medium text-sm cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <span>Learn More</span>
                      <TrendUp weight="bold" className="w-4 h-4 ml-2" />
                    </motion.div>
                  </CardContent>
                  
                  {/* Subtle background decoration */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-tr from-primary/5 to-secondary/5 group-hover:scale-110 transition-transform duration-500"></div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Harbor Launch */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary/10"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 rounded-full bg-secondary/10"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full bg-accent/10"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
              Ready to Access
              <br />
              Professional DeFi?
            </h2>
            <p className="font-body text-xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.7)'}}>
              Join hundreds of users who&apos;ve found their trusted guide to DeFi savings. Start with any amount and watch your assets grow securely.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-gray-100 hover:text-slate-800 text-lg px-8 py-4 font-semibold shadow-xl border-2 border-white/20 transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <Link href="/dashboard">
                    <Vault weight="fill" className="w-5 h-5 mr-2" />
                    Start Your Journey
                  </Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button asChild variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10 bg-transparent">
                  <Link href="/properties">
                    <TrendUp weight="bold" className="w-5 h-5 mr-2" />
                    See Performance
                  </Link>
                </Button>
              </motion.div>
            </div>
            
            {/* Social Links */}
            <motion.div 
              className="mt-12 flex flex-wrap justify-center items-center gap-6 text-white text-sm font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <a 
                href="https://x.com/havenfi" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-black/30 backdrop-blur border border-white/20 px-4 py-2 rounded-full shadow-lg hover:bg-black/40 transition-all duration-200 hover:scale-105"
              >
                <X weight="fill" className="w-4 h-4 mr-2 text-white" />
                <span style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Twitter/X</span>
              </a>
              <a 
                href="https://t.me/HavenFi_RWA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-black/30 backdrop-blur border border-white/20 px-4 py-2 rounded-full shadow-lg hover:bg-black/40 transition-all duration-200 hover:scale-105"
              >
                <TelegramLogo weight="fill" className="w-4 h-4 mr-2 text-blue-400" />
                <span style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Telegram</span>
              </a>
              <a 
                href="/whitepaper.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-black/30 backdrop-blur border border-white/20 px-4 py-2 rounded-full shadow-lg hover:bg-black/40 transition-all duration-200 hover:scale-105"
              >
                <FileText weight="fill" className="w-4 h-4 mr-2 text-accent" />
                <span style={{textShadow: '1px 1px 2px rgba(0,0,0,0.8)'}}>Whitepaper</span>
              </a>
            </motion.div>
            
          </motion.div>
        </div>
      </section>
    </div>
  );
}
