'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useWallet } from '@/context/WalletContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Anchor, Wallet } from 'phosphor-react';

export default function Header() {
  const { wallet, connect, disconnect } = useWallet();

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-b border-border bg-card/95 backdrop-blur sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="font-heading text-2xl font-bold text-primary flex items-center space-x-3">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm"
              >
                <Anchor weight="fill" className="text-white w-5 h-5" />
              </motion.div>
              <span className="text-foreground">HavenFi</span>
            </Link>
            <nav className="ml-10 flex items-baseline space-x-1">
              {[
                { href: '/', label: 'Home' },
                { href: '/dashboard', label: 'My Vault' },
                { href: '/properties', label: 'Properties' },
                { href: '/pools', label: 'Pools' }
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href={item.href} 
                    className="font-body text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-accent/10"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {wallet.connected ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-3 bg-accent/10 rounded-xl px-4 py-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                      {wallet.address?.slice(2, 4).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-semibold text-foreground font-body">
                      {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                    </div>
                    <div className="flex items-center space-x-2 text-xs">
                      <Badge variant="secondary" className="text-xs px-2 py-0 bg-secondary/20 text-secondary font-medium">
                        HAVEN: {wallet.havenTokens}
                      </Badge>
                      <Badge variant="outline" className="text-xs px-2 py-0 border-border text-muted-foreground">
                        USDC: ${wallet.balance.usdc}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={disconnect}
                  variant="outline"
                  size="sm"
                  className="border-border text-muted-foreground hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 font-body"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={connect}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 font-body shadow-sm"
                >
                  <Wallet weight="bold" className="w-4 h-4 mr-2" />
                  Connect Wallet
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}