"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Copy, CheckCircle2, HandCoins, Landmark, Heart } from "lucide-react";

export type GiveDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const mpesaPurposeOptions = ["Tithe", "General Offering", "Building Fund", "Missions", "Other"];

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const update = () => setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return isMobile;
};

const GiveDrawer = ({ isOpen, onClose }: GiveDrawerProps) => {
  const isMobile = useIsMobile();
  const [purpose, setPurpose] = useState("Tithe");
  const [customPurpose, setCustomPurpose] = useState("");
  const [accountNote, setAccountNote] = useState("Offering");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = useCallback(async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.error("Clipboard copy failed", error);
    }
  }, []);

  const closeDrawer = useCallback(() => {
    setPurpose("Tithe");
    setCustomPurpose("");
    setAccountNote("Offering");
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [closeDrawer, isOpen]);

  const verse = useMemo(
    () => ({
      text: "Each of you should give what you have decided in your heart to give...",
      reference: "2 Corinthians 9:7",
    }),
    []
  );

  const drawerVariants = {
    hidden: isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 },
    visible: { x: 0, y: 0, opacity: 1 },
    exit: isMobile ? { y: "100%", opacity: 0 } : { x: "100%", opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[2100] flex items-end md:items-stretch justify-end bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDrawer}
        >
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full md:max-w-lg h-[92vh] md:h-full rounded-t-3xl md:rounded-none md:rounded-l-3xl bg-gradient-to-b from-[#fff8f5] to-white shadow-2xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Give to CITAM Kisumu"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-orange-100">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-[#c04b37]">Give</p>
                <h2 className="text-2xl font-semibold text-[#3c0d0d]">Fuel the mission at CITAM Kisumu</h2>
              </div>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close giving drawer"
                className="p-2 rounded-full hover:bg-black/10 text-[#3c0d0d]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-6">
              <div className="rounded-2xl bg-white border border-orange-100 p-4 flex gap-4 items-start">
                <Heart className="w-8 h-8 text-[#c04b37]" />
                <div>
                  <p className="text-sm text-gray-600">{verse.reference}</p>
                  <p className="text-base font-medium text-gray-900">{verse.text}</p>
                </div>
              </div>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ffe8dc] text-[#c04b37]">
                    <HandCoins className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#3c0d0d]">M-Pesa (PayBill)</p>
                    <p className="text-xs text-gray-500">Fastest and most convenient way to give</p>
                  </div>
                </div>

                <div className="rounded-3xl bg-white border border-orange-100 p-5 space-y-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Paybill Number</p>
                    <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#fff5ef] px-4 py-3">
                      <p className="text-2xl font-bold text-[#c04b37]">933946</p>
                      <button
                        type="button"
                        onClick={() => handleCopy("933946", "mpesa" )}
                        className="flex items-center gap-1 text-sm text-[#c04b37]"
                      >
                        {copiedField === "mpesa" ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <label className="block text-sm font-semibold text-gray-700">
                    Account Number / Reference
                    <input
                      type="text"
                      value={accountNote}
                      onChange={(e) => setAccountNote(e.target.value)}
                      placeholder="Offering, Tithe, Your Name..."
                      className="mt-2 w-full rounded-2xl border border-orange-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </label>

                  <label className="block text-sm font-semibold text-gray-700">
                    Purpose
                    <select
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-orange-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                    >
                      {mpesaPurposeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  {purpose === "Other" && (
                    <input
                      type="text"
                      value={customPurpose}
                      onChange={(e) => setCustomPurpose(e.target.value)}
                      placeholder="Describe your giving purpose"
                      className="w-full rounded-2xl border border-orange-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  )}

                  <ol className="space-y-2 text-sm text-gray-600">
                    <li>1. Open M-Pesa app</li>
                    <li>2. Go to Lipa na M-Pesa → Pay Bill</li>
                    <li>3. Enter Paybill <strong>933946</strong></li>
                    <li>4. Account: type purpose or your name</li>
                    <li>5. Confirm amount → Send</li>
                  </ol>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8efff] text-[#3152a1]">
                    <Landmark className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1f2f60]">Bank Transfer</p>
                    <p className="text-xs text-gray-500">Use your preferred bank app or USSD</p>
                  </div>
                </div>

                <div className="rounded-3xl bg-white border border-blue-100 p-5 space-y-4">
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Account Number</p>
                      <div className="mt-1 flex items-center justify-between rounded-2xl bg-[#f4f7ff] px-4 py-3">
                        <p className="text-lg font-semibold text-[#1f2f60]">1234567890</p>
                        <button
                          type="button"
                          onClick={() => handleCopy("1234567890", "bank")}
                          className="flex items-center gap-1 text-sm text-[#1f2f60]"
                        >
                          {copiedField === "bank" ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                    <p><span className="font-semibold">Bank:</span> Cooperative Bank</p>
                    <p><span className="font-semibold">Branch:</span> Nairobi</p>
                    <p><span className="font-semibold">Account Name:</span> CITAM Kisumu</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Use any bank app/USSD → Transfer to the account above → Add your giving purpose in the narration line.
                  </p>
                </div>
              </section>

              <section className="space-y-3 rounded-3xl bg-white border border-gray-200 p-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 text-gray-700">
                    <Heart className="w-5 h-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">Cheque / Physical Giving</p>
                    <p className="text-xs text-gray-500">For those who prefer in-person worship giving</p>
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Write cheques to: <strong>Christ Is The Answer Ministries Kisumu</strong></li>
                  <li>• Deliver to: Church Office, Kisumu Sanctuary (Mon-Fri, 9am–5pm)</li>
                  <li>• We are grateful for your faithful giving ♥</li>
                </ul>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GiveDrawer;
