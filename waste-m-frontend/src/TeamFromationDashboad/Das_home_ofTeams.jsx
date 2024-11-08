import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Link, Outlet } from "react-router-dom";
import SideNav from "./Teams_side_nav";
import { useParams } from "react-router-dom";

function Das_home_ofTeams() {
  return (
    <section className="  ">
      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <div className="grid grid-cols-4 gap-1 h-full">
          {/* Team Info & Actions */}
          <SideNav />

          {/* Chat/Content Area */}
          <div className="col-span-3">
            <Card className="h-full">
              <Outlet />
            </Card>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Das_home_ofTeams;
