import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/company.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.css'
})
export class CompanyListComponent implements OnInit {
  companies: Company[] = [];
  filteredCompanies: Company[] = [];
  searchText = '';
  selectedIndustry = 'All';
  selectedLocation = 'All';

  industries: string[] = [];
  locations: string[] = [];

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe(data => {
      this.companies = data;
      this.filteredCompanies = data;
      this.industries = ['All', ...new Set(data.map(c => c.industry))];
      this.locations = ['All', ...new Set(data.map(c => c.location))];
    });
  }

  applyFilters() {
    this.filteredCompanies = this.companies.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(this.searchText.toLowerCase());
      const matchesIndustry = this.selectedIndustry === 'All' || c.industry === this.selectedIndustry;
      const matchesLocation = this.selectedLocation === 'All' || c.location === this.selectedLocation;
      return matchesSearch && matchesIndustry && matchesLocation;
    });
  }
}
