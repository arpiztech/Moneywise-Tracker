"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, MoreVertical, Edit, Trash2 } from "lucide-react";
import { categories as initialCategories, type Category } from "@/lib/data";
import { CategoryForm, type CategoryFormValues } from "@/components/dashboard/category-form";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<[string, Category] | null>(null);

  const handleSave = (data: CategoryFormValues) => {
    if (editingCategory) {
      // This is a simplified update. A real app would have a more robust state management.
      const updatedCategories = { ...categories };
      const originalKey = editingCategory[0];
      
      // If the name (key) changed, we need to handle that.
      if (originalKey !== data.name) {
        delete updatedCategories[originalKey];
      }

      updatedCategories[data.name] = {
        name: data.name,
        // In a real app, you would have a way to select an icon.
        // For now, we keep the old icon or a default one.
        icon: editingCategory[1].icon, 
      };
      setCategories(updatedCategories);

    } else {
      // Simplified add, assumes icon is handled elsewhere
      const newCategory: Category = {
        name: data.name,
        // Default icon for new categories
        icon: initialCategories['Shopping'].icon
      };
      setCategories(prev => ({ ...prev, [data.name]: newCategory }));
    }
    setEditingCategory(null);
    setIsFormOpen(false);
  };

  const handleEdit = (key: string, category: Category) => {
    setEditingCategory([key, category]);
    setIsFormOpen(true);
  };

  const handleDelete = (key: string) => {
    const newCategories = { ...categories };
    delete newCategories[key];
    setCategories(newCategories);
  };
  
  const handleAdd = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  }

  return (
    <DashboardLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Categories</CardTitle>
          <Button onClick={handleAdd}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(categories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <Card key={key} className="flex flex-col justify-between">
                  <CardHeader className="flex-row items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <Icon className="h-6 w-6 text-muted-foreground" />
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    {category.name !== 'Income' && (
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(key, category)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                            onClick={() => handleDelete(key)}
                            className="text-destructive"
                            >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <CategoryForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={handleSave}
        defaultValues={editingCategory ? editingCategory[1] : undefined}
      />
    </DashboardLayout>
  );
}
