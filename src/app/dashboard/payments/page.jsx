"use client";
import { useState } from "react";
import { downloadPaymentReport } from "@/lib/reportUtils";
// Import modals
import { BillGenerateModal } from "@/components/modals/BillGenerateModal";
import { BillDetailsModal } from "@/components/modals/BillDetailsModal";
import { PaymentModal } from "@/components/modals/PaymentModal";
// Import data
import { billingStats, memberBills, paymentMethods } from "@/lib/data";

// Import components
import HeaderPayments from "@/components/dashboard/payments/HeaderPayments";
import MonthsSelectorPayments from "@/components/dashboard/payments/MonthsSelectorPayments";
import StatisticsPayments from "@/components/dashboard/payments/StatisticsPayments";
import CollectionProgressPayments from "@/components/dashboard/payments/CollectionProgressPayments";
import MemberBillsPayments from "@/components/dashboard/payments/MemberBillsPayments";
import PaymentMethodsSummaryPayments from "@/components/dashboard/payments/PaymentMethodsSummaryPayments";
import RecentPayments from "@/components/dashboard/payments/RecentPayments";

export default function PaymentPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Combined 3 modal states in one common state for better management
  const [modalOpen, setModalOpen] = useState({
    payment: false,
    billGenerate: false,
    billDetails: false,
  });
  const [selectedMemberForPayment, setSelectedMemberForPayment] =
    useState(null);
  const [selectedBillForView, setSelectedBillForView] = useState(null);
  const [payments, setPayments] = useState([]);

  // Payment handlers
  const handlePaymentClick = (member) => {
    setSelectedMemberForPayment(member);
    setModalOpen({ ...modalOpen, payment: true });
  };

  const handlePaymentSubmit = (paymentData) => {
    setPayments((prev) => [...prev, paymentData]);

    // Update member bill status (in real app, this would be an API call)
    // For demo purposes, you could update the memberBills state if it was made stateful
    console.log("Payment recorded:", paymentData);
  };

  const handleBillGenerate = (billData) => {
    console.log("Bill generated:", billData);
    // In real app, this would call API to generate bills
  };

  const handleViewBill = (bill) => {
    setSelectedBillForView(bill);
    setModalOpen({ ...modalOpen, billDetails: true });
  };

  const handleDownloadReport = () => {
    downloadPaymentReport(
      memberBills,
      billingStats,
      selectedMonth,
      selectedYear
    );
  };

  // INFO: For payment modal, to keep it untouched
  //  Mock members data for PaymentModal

  const members = memberBills.map((bill) => ({
    id: bill.id,
    name: bill.memberName,
    role: bill.id === 1 ? "admin" : "member",
  }));

  return (
    <>
      <div className="space-y-6">
        {/* Header */}

        <HeaderPayments
          setModalOpen={setModalOpen}
          handleDownloadReport={handleDownloadReport}
        />

        {/* Month Selector */}
        {/* TODO: optimize */}
        <MonthsSelectorPayments
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />

        {/* Stats Cards */}
        <StatisticsPayments billingStats={billingStats} />

        {/* Collection Progress */}
        <CollectionProgressPayments billingStats={billingStats} />

        {/* Member Bills Table */}
        <MemberBillsPayments
          handleViewBill={handleViewBill}
          handlePaymentClick={handlePaymentClick}
        />

        {/* Payment Methods Summary */}
        <PaymentMethodsSummaryPayments
          memberBills={memberBills}
          paymentMethods={paymentMethods}
        />

        {/* Recent Payments */}
        <RecentPayments
          memberBills={memberBills}
          paymentMethods={paymentMethods}
        />
      </div>

      {/* Modals */}
      {/* TODO: can be optimized later with permission from project manager */}
      <PaymentModal
        isOpen={modalOpen.payment}
        onClose={() => setModalOpen({ ...modalOpen, payment: false })}
        onSubmit={handlePaymentSubmit}
        members={members}
        paymentData={
          selectedMemberForPayment
            ? {
                memberId: selectedMemberForPayment.id,
                memberName: selectedMemberForPayment.name,
              }
            : null
        }
      />
      <BillGenerateModal
        isOpen={modalOpen.billGenerate}
        onClose={() => setModalOpen({ ...modalOpen, billGenerate: false })}
        onSubmit={handleBillGenerate}
      />

      <BillDetailsModal
        isOpen={modalOpen.billDetails}
        onClose={() => {
          setModalOpen({ ...modalOpen, billDetails: false });
          setSelectedBillForView(null);
        }}
        billData={selectedBillForView}
      />
    </>
  );
}
