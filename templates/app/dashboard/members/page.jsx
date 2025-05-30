"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  UsersIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserCircleIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { MemberModal, DeleteConfirmation } from "@/components/modals";

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "মাসুদ আহমেদ",
      phone: "01712345678",
      email: "masud@email.com",
      role: "admin",
      joinDate: "2024-01-15",
      status: "active",
      totalMeals: 45,
      totalPaid: 6750,
      due: 0,
    },
    {
      id: 2,
      name: "রহিম উদ্দিন",
      phone: "01798765432",
      email: "rahim@email.com",
      role: "member",
      joinDate: "2024-02-01",
      status: "active",
      totalMeals: 42,
      totalPaid: 6000,
      due: 300,
    },
    {
      id: 3,
      name: "করিম সাহেব",
      phone: "01856789123",
      email: "karim@email.com",
      role: "member",
      joinDate: "2024-01-20",
      status: "active",
      totalMeals: 38,
      totalPaid: 5700,
      due: 0,
    },
    {
      id: 4,
      name: "নাসির হোসেন",
      phone: "01634567890",
      email: "nasir@email.com",
      role: "sub_admin",
      joinDate: "2024-02-10",
      status: "active",
      totalMeals: 40,
      totalPaid: 5800,
      due: 200,
    },
    {
      id: 5,
      name: "আলী হাসান",
      phone: "01923456789",
      email: "ali@email.com",
      role: "member",
      joinDate: "2024-03-01",
      status: "inactive",
      totalMeals: 15,
      totalPaid: 2250,
      due: 0,
    },
  ]);

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
  );
  const getRoleBadge = (role) => {
    const roleMap = {
      admin: {
        label: "অ্যাডমিন",
        color:
          "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200",
      },
      sub_admin: {
        label: "সাব-অ্যাডমিন",
        color:
          "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200",
      },
      member: {
        label: "সদস্য",
        color:
          "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200",
      },
      cook: {
        label: "রাঁধুনি",
        color:
          "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200",
      },
    };
    const roleInfo = roleMap[role] || roleMap.member;
    return <Badge className={roleInfo.color}>{roleInfo.label}</Badge>;
  };

  const getStatusBadge = (status) => {
    return status === "active" ? (
      <Badge className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200">
        সক্রিয়
      </Badge>
    ) : (
      <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
        নিষ্ক্রিয়
      </Badge>
    );
  };
  const activeMembers = members.filter((m) => m.status === "active").length;
  const totalDue = members.reduce((sum, m) => sum + m.due, 0);
  const totalMeals = members.reduce((sum, m) => sum + m.totalMeals, 0);

  // Modal handlers
  const handleAddMember = () => {
    setSelectedMember(null);
    setMemberModalOpen(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setMemberModalOpen(true);
  };

  const handleDeleteMember = (member) => {
    setMemberToDelete(member);
    setDeleteModalOpen(true);
  };

  const handleMemberSubmit = (memberData) => {
    if (selectedMember) {
      // Edit existing member
      setMembers((prev) =>
        prev.map((member) =>
          member.id === selectedMember.id
            ? { ...member, ...memberData }
            : member
        )
      );
    } else {
      // Add new member
      const newMember = {
        ...memberData,
        id: Date.now(),
        joinDate: new Date().toISOString().split("T")[0],
        totalMeals: 0,
        totalPaid: 0,
        due: 0,
      };
      setMembers((prev) => [...prev, newMember]);
    }
  };

  const confirmDeleteMember = () => {
    if (memberToDelete) {
      setMembers((prev) =>
        prev.filter((member) => member.id !== memberToDelete.id)
      );
      setDeleteModalOpen(false);
      setMemberToDelete(null);
    }
  };

  return (
    <>
      {" "}
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              সদস্য ব্যবস্থাপনা
            </h1>
            <p className="text-gray-600">
              মেসের সকল সদস্যদের তথ্য ও ব্যবস্থাপনা
            </p>
          </div>{" "}
          <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={handleAddMember}
          >
            <PlusIcon className="w-4 h-4 mr-2" />
            নতুন সদস্য যোগ করুন
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">মোট সদস্য</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {members.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    সক্রিয় সদস্য
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {activeMembers}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">মোট মিল</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalMeals}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    মোট বকেয়া
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    ৳{totalDue}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>সদস্য তালিকা</CardTitle>
                <CardDescription>সকল সদস্যদের বিস্তারিত তথ্য</CardDescription>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="নাম বা ফোন নম্বর খুঁজুন..."
                    className="pl-9 w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      সদস্য
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      যোগাযোগ
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      ভূমিকা
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      স্ট্যাটাস
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      মিল সংখ্যা
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      পেমেন্ট
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      বকেয়া
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <UserCircleIcon className="w-6 h-6 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {member.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              যোগদান:{" "}
                              {new Date(member.joinDate).toLocaleDateString(
                                "bn-BD"
                              )}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-600">
                            <PhoneIcon className="w-4 h-4 mr-2" />
                            {member.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <EnvelopeIcon className="w-4 h-4 mr-2" />
                            {member.email}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">{getRoleBadge(member.role)}</td>
                      <td className="py-4 px-4">
                        {getStatusBadge(member.status)}
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-semibold">
                          {member.totalMeals}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-green-600 font-semibold">
                          ৳{member.totalPaid}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`font-semibold ${
                            member.due > 0 ? "text-red-600" : "text-green-600"
                          }`}
                        >
                          ৳{member.due}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            title="বিস্তারিত দেখুন"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditMember(member)}
                            title="সম্পাদনা করুন"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteMember(member)}
                            title="মুছে ফেলুন"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>{" "}
        </Card>
      </div>
      {/* Modals */}
      <MemberModal
        isOpen={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
        onSubmit={handleMemberSubmit}
        memberData={selectedMember}
      />
      <DeleteConfirmation
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteMember}
        itemName={memberToDelete?.name}
        itemType="সদস্য"
      />
    </>
  );
}
