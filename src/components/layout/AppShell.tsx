"use client";

import {
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import BottomNavigation from "./BottomNavigation";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({
  children,
}: AppShellProps) {
  const [
    mobileMenuOpen,
    setMobileMenuOpen,
  ] = useState(false);

  const openDrawer = useCallback(() => {
    setMobileMenuOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  /**
   * Body scroll lock mobil menü nyitásakor.
   */
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [mobileMenuOpen]);

  /**
   * ESC bezárja a menüt.
   */
  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    function handleKeyDown(
      event: KeyboardEvent,
    ) {
      if (event.key === "Escape") {
        closeDrawer();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [
    mobileMenuOpen,
    closeDrawer,
  ]);

  /**
   * Desktop méretre váltáskor
   * automatikusan bezárjuk a Drawert.
   */
  useEffect(() => {
    const mediaQuery =
      window.matchMedia("(min-width: 1024px)");

    function handleChange(
      event: MediaQueryListEvent,
    ) {
      if (event.matches) {
        closeDrawer();
      }
    }

    mediaQuery.addEventListener(
      "change",
      handleChange,
    );

    if (mediaQuery.matches) {
      closeDrawer();
    }

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleChange,
      );
    };
  }, [closeDrawer]);

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        open={mobileMenuOpen}
        onClose={closeDrawer}
      />

      {/* Main Layout */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={openDrawer}
        />

        <main className="min-h-0 flex-1 pb-20 lg:pb-0">
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
      </div>

      <BottomNavigation />
    </div>
  );
}